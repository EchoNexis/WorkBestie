package com.serverside.workbestieBackend;

import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Log
public class WebController {

    private TaskService taskService;

    public WebController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/getAllTasks")
    public void getAllTasks(){
        log.info("getAllTasks");
    }

    @PostMapping("/saveTask")
    public void saveTask(@RequestBody TaskDocument taskDocument){
        log.info("saveTask");
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id){
        log.info("deleteTask");
        return ResponseEntity.noContent().build();
    }



}
