package com.emres.tasktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emres.tasktracker.model.Task;
import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Integer> {
  public List<Task> findByTaskAssignedPersonIgnoreCase(String taskAssignedPerson);
}
