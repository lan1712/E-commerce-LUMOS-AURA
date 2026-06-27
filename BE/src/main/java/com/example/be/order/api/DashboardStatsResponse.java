package com.example.be.order.api;

import java.util.List;

public record DashboardStatsResponse(
    List<MetricDTO> metrics,
    List<RevenueDataDTO> revenueData,
    List<TopSellerDTO> topSellers,
    List<RecentOrderDTO> recentOrders
) {
    public record MetricDTO(
        String label,
        String value,
        String change,
        boolean up
    ) {}

    public record RevenueDataDTO(
        String m,
        int v
    ) {}

    public record TopSellerDTO(
        String name,
        int units,
        int pct
    ) {}

    public record RecentOrderDTO(
        String id,
        String customer,
        String date,
        String amount,
        String status
    ) {}
}
