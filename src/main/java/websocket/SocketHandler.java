package websocket;

import com.google.gson.Gson;
import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SocketHandler extends TextWebSocketHandler {

    //List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    //K-projectName V-WebSocketSessions list
    @Getter
    Map<String, ArrayList<WebSocketSession>> sessions = new ConcurrentHashMap<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        String projectName = message.getPayload();
        System.out.println(message.getPayload());
        sessions.computeIfAbsent(projectName, k -> new ArrayList<>());
        sessions.get(projectName).add(session);
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }


}