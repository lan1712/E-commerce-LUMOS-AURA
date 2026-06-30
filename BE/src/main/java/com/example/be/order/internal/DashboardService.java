package com.example.be.order.internal;

import com.example.be.auth.domain.UserRepository;
import com.example.be.order.api.DashboardStatsResponse;
import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderItemRepository;
import com.example.be.order.domain.OrderRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    public DashboardService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    public DashboardStatsResponse getStats() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime thisMonthStart = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime lastMonthStart = thisMonthStart.minusMonths(1);
        
        long totalOrdersThisMonth = orderRepository.countOrdersBetween(thisMonthStart, now);
        long totalOrdersLastMonth = orderRepository.countOrdersBetween(lastMonthStart, thisMonthStart);

        BigDecimal revenueThisMonth = orderRepository.sumRevenueBetween(thisMonthStart, now);
        BigDecimal revenueLastMonth = orderRepository.sumRevenueBetween(lastMonthStart, thisMonthStart);

        long usersThisMonth = userRepository.countUsersBetween(thisMonthStart, now);
        long usersLastMonth = userRepository.countUsersBetween(lastMonthStart, thisMonthStart);

        // All-time for base numbers? The mock data showed big numbers like 1,248 orders total. Let's use all-time.
        long allTimeOrders = orderRepository.count();
        BigDecimal allTimeRevenue = orderRepository.sumRevenueBetween(LocalDateTime.of(2000, 1, 1, 0, 0), now);
        long allTimeUsers = userRepository.count();

        // Calculate conversions
        double conversionThisMonth = usersThisMonth > 0 ? (double) totalOrdersThisMonth / usersThisMonth * 100 : 0;
        double conversionLastMonth = usersLastMonth > 0 ? (double) totalOrdersLastMonth / usersLastMonth * 100 : 0;
        double allTimeConversion = allTimeUsers > 0 ? (double) allTimeOrders / allTimeUsers * 100 : 0;

        List<DashboardStatsResponse.MetricDTO> metrics = new ArrayList<>();
        metrics.add(buildMetric("TOTAL ORDERS", allTimeOrders, totalOrdersThisMonth, totalOrdersLastMonth, false));
        metrics.add(buildMetric("REVENUE", allTimeRevenue, revenueThisMonth, revenueLastMonth, true));
        metrics.add(buildMetric("NEW CUSTOMERS", allTimeUsers, usersThisMonth, usersLastMonth, false));
        metrics.add(buildMetric("CONVERSION", allTimeConversion, conversionThisMonth, conversionLastMonth, false, true));

        // Revenue Growth (Current year)
        int currentYear = now.getYear();
        List<Object[]> monthlyData = orderRepository.getMonthlyRevenue(currentYear);
        List<DashboardStatsResponse.RevenueDataDTO> revenueData = new ArrayList<>();
        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        for (int i = 1; i <= 12; i++) {
            final int m = i;
            BigDecimal rev = monthlyData.stream()
                    .filter(row -> ((Number) row[0]).intValue() == m)
                    .map(row -> (BigDecimal) row[1])
                    .findFirst()
                    .orElse(BigDecimal.ZERO);
            revenueData.add(new DashboardStatsResponse.RevenueDataDTO(monthNames[i-1], rev.intValue() / 1000)); // scale for chart? or leave raw? mock was in 'k' like 124k, data was 42, 55. Let's send raw integer.
        }

        // Top Sellers
        List<Object[]> topItems = orderItemRepository.findTopSellingProducts(PageRequest.of(0, 4));
        List<DashboardStatsResponse.TopSellerDTO> topSellers = new ArrayList<>();
        long maxQty = topItems.isEmpty() ? 1 : ((Number) topItems.get(0)[1]).longValue();
        for (Object[] row : topItems) {
            String name = (String) row[0];
            int units = ((Number) row[1]).intValue();
            int pct = (int) Math.round((double) units / maxQty * 100);
            topSellers.add(new DashboardStatsResponse.TopSellerDTO(name, units, pct));
        }

        // Recent Orders
        List<Order> recent = orderRepository.findTop5ByOrderByCreatedAtDesc();
        List<DashboardStatsResponse.RecentOrderDTO> recentOrders = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("vi-VN"));
        currencyFormatter.setMaximumFractionDigits(0);
        for (Order o : recent) {
            recentOrders.add(new DashboardStatsResponse.RecentOrderDTO(
                o.getOrderNumber(),
                o.getShipName(),
                o.getCreatedAt().format(formatter),
                currencyFormatter.format(o.getTotal()),
                o.getStatus()
            ));
        }

        return new DashboardStatsResponse(metrics, revenueData, topSellers, recentOrders);
    }

    private DashboardStatsResponse.MetricDTO buildMetric(String label, Number allTimeVal, Number currentMonth, Number lastMonth, boolean isCurrency) {
        return buildMetric(label, allTimeVal, currentMonth, lastMonth, isCurrency, false);
    }

    private DashboardStatsResponse.MetricDTO buildMetric(String label, Number allTimeVal, Number currentMonth, Number lastMonth, boolean isCurrency, boolean isPercent) {
        String valueStr;
        if (isCurrency) {
            valueStr = formatCompactVnd(allTimeVal.doubleValue());
        } else if (isPercent) {
            valueStr = String.format("%.1f%%", allTimeVal.doubleValue());
        } else {
            valueStr = formatNumber(allTimeVal.doubleValue());
        }

        double curr = currentMonth.doubleValue();
        double last = lastMonth.doubleValue();
        double change = 0;
        if (last > 0) {
            change = ((curr - last) / last) * 100;
        } else if (curr > 0) {
            change = 100;
        }

        String changeStr = String.format("%s%.1f%%", change >= 0 ? "+" : "", change);
        return new DashboardStatsResponse.MetricDTO(label, valueStr, changeStr, change >= 0);
    }

    private String formatNumber(double number) {
        return NumberFormat.getNumberInstance(Locale.US).format(Math.round(number));
    }

    private String formatCompactVnd(double amount) {
        if (amount >= 1_000_000_000) {
            return formatNumber(amount / 1_000_000_000) + " tỷ đ";
        }
        if (amount >= 1_000_000) {
            return formatNumber(amount / 1_000_000) + " triệu đ";
        }
        return NumberFormat.getCurrencyInstance(Locale.forLanguageTag("vi-VN")).format(Math.round(amount));
    }
}
