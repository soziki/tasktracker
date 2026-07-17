package com.emres.tasktracker.controller;

import java.util.List;

import com.emres.tasktracker.model.Task;

public interface ITaskController {
  //methods
  public List<Task> getAllTasks(); 

  public List<Task> getTasksByKeycloakUsername();

  public Task getUserTaskById(Integer id);

  public Task getTaskById(Integer id); 

  public Task saveTask(Task task);

  public Task updateTask(Integer id, Task task);

  public Task deleteTask(Integer id);

}
