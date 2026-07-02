package com.emres.tasktracker.service;

import java.util.List;

import com.emres.tasktracker.model.Task;

public interface ITaskService {
  public List<Task> getAllTasks();

  public Task getTaskById(Integer id);

  public Task saveTask(Task task);

}
