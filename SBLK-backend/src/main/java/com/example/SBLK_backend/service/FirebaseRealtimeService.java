package com.example.SBLK_backend.service;

import com.google.firebase.database.*;
import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseRealtimeService {

    private final DatabaseReference rootRef = FirebaseDatabase.getInstance().getReference();

    // ✅ Works on Firebase Admin SDK 9.2.0 (no .get() usage)
    public Double[] getLiveLocationForBus(String busNumber) {
        final Double[] coords = new Double[2];
        final CountDownLatch latch = new CountDownLatch(1);

        rootRef.child("bus_locations").child(busNumber)
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot snap) {
                        if (snap.exists()) {
                            Object latObj = snap.child("latitude").getValue();
                            Object lngObj = snap.child("longitude").getValue();
                            coords[0] = latObj == null ? null : Double.valueOf(latObj.toString());
                            coords[1] = lngObj == null ? null : Double.valueOf(lngObj.toString());
                        } else {
                            coords[0] = null;
                            coords[1] = null;
                        }
                        latch.countDown();
                    }

                    @Override
                    public void onCancelled(DatabaseError error) {
                        System.err.println("Firebase read failed: " + error.getMessage());
                        latch.countDown();
                    }
                });

        try {
            latch.await();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return coords;
    }

    // ✅ Send FCM push notification to one device token
    public void sendPushToToken(String deviceToken, String title, String body) {
        try {
            Message message = Message.builder()
                    .setToken(deviceToken)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .putData("source", "smartbus")
                    .build();

            FirebaseMessaging.getInstance().sendAsync(message).get();
            System.out.println("✅ Notification sent to " + deviceToken);
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("FCM send failed: " + e.getMessage(), e);
        }
    }
}
