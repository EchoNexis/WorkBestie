package com.serverside.workbestieBackend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepositoryDB extends MongoRepository<TaskDocument, String> {
}
