package com.example.be.order.internal.momo;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class MomoService {

    private final MomoConfig momoConfig;

    public MomoService(MomoConfig momoConfig) {
        this.momoConfig = momoConfig;
    }

    public String createOrder(String orderNumber, BigDecimal amount, String orderInfo) {
        RestTemplate restTemplate = new RestTemplate();

        // Prices are stored in VND. MoMo expects a whole VND amount.
        long amountValue = amount.setScale(0, RoundingMode.HALF_UP).longValueExact();
        
        String requestId = UUID.randomUUID().toString();
        // Since we want to use the same order ID when retrying, we might need a unique orderId for MoMo
        // MoMo rejects duplicate orderIds. So we suffix it with a timestamp
        String momoOrderId = orderNumber + "-" + System.currentTimeMillis();
        
        String requestType = "captureWallet";
        String extraData = "";
        
        // signature construction
        String rawSignature = "accessKey=" + momoConfig.accessKey +
                "&amount=" + amountValue +
                "&extraData=" + extraData +
                "&ipnUrl=" + momoConfig.ipnUrl +
                "&orderId=" + momoOrderId +
                "&orderInfo=" + orderInfo +
                "&partnerCode=" + momoConfig.partnerCode +
                "&redirectUrl=" + momoConfig.redirectUrl +
                "&requestId=" + requestId +
                "&requestType=" + requestType;
                
        String signature = MomoConfig.signHmacSHA256(rawSignature, momoConfig.secretKey);
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("partnerCode", momoConfig.partnerCode);
        requestBody.put("partnerName", "Lumos Aura");
        requestBody.put("storeId", "Lumos Aura");
        requestBody.put("requestId", requestId);
        requestBody.put("amount", amountValue);
        requestBody.put("orderId", momoOrderId);
        requestBody.put("orderInfo", orderInfo);
        requestBody.put("redirectUrl", momoConfig.redirectUrl);
        requestBody.put("ipnUrl", momoConfig.ipnUrl);
        requestBody.put("lang", "en");
        requestBody.put("extraData", extraData);
        requestBody.put("requestType", requestType);
        requestBody.put("signature", signature);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response = restTemplate.postForObject(momoConfig.endpoint, entity, Map.class);
            if (response != null && response.containsKey("payUrl")) {
                return (String) response.get("payUrl");
            } else {
                throw new RuntimeException("MoMo API Error: " + response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create MoMo payment request: " + e.getMessage());
        }
    }
}
