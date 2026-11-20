package tarea.cuatro.controllers;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import tarea.cuatro.services.AppService;

@Controller
public class AppController {
    private final AppService appService;

    public AppController(AppService appService){
        this.appService = appService;

    }

    @GetMapping("/")
    public String indexRoute(Model model){
    }
}