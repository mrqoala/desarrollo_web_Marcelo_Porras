package tarea.cuatro.services;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import tarea.cuatro.models.Models;
import tarea.cuatro.models.ModelsRepository;


@Service
public class AppService {

    private final String pathStatic;
    private final ModelsRepository modelsRepository;

    public AppService(ModelsRepository modelsRepository) throws IOException {
        this.modelsRepository= modelsRepository;
        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic= staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
}