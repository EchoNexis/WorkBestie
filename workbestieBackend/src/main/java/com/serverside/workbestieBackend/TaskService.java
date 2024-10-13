package com.serverside.workbestieBackend;

import org.springframework.stereotype.Service;

@Service
public class TaskService {

    public TaskRepositoryDB taskRepository;

    public TaskService(TaskRepositoryDB taskRepository){
        this.taskRepository = taskRepository;
    }



}
