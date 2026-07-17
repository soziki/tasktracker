package com.emres.tasktracker.service;

import java.util.List;

import com.emres.tasktracker.model.Task;

public interface ITaskService {
  public List<Task> getAllTasks();

  public List<Task> getTasksByKeycloakUsername(String username);

  public Task getUserTaskById(Integer id, String username);

  public Task getTaskById(Integer id);

  public Task saveTask(Task task);

  public Task updateTask(Integer id, Task taskDetails);

  public Task deleteTask(Integer id);
  
}
