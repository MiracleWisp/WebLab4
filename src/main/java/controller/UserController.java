package controller;

import entity.User;
import main.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@EnableAutoConfiguration
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createNewUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        User userExists = userService.findUserByUsername(user.getUsername());
        if (userExists != null) {
            bindingResult
                    .rejectValue("username", "error.user",
                            "There is already a user registered with the username provided");
        }
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(false,
                    "There is already a user registered with the username provided"));
        } else {
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(new Response(true, "User created"));
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.status(HttpStatus.OK).body("{\n" +
                "  \"successful\": true,\n" +
                "  \"role\": \"USER\",\n" +
                "  \"username\":\"" + authentication.getName() + "\"\n" +
                "}");
    }


}
