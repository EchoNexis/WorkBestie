package com.serverside.workbestieBackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "TaskDB")
public class TaskDocument {

    @Id
    String id;
    String title;
    String task;

}
