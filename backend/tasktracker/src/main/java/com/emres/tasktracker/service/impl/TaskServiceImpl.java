package com.emres.tasktracker.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emres.tasktracker.model.Task;
import com.emres.tasktracker.repository.TaskRepository;
import com.emres.tasktracker.service.ITaskService;
@Service
public class TaskServiceImpl implements ITaskService {
  @Autowired
  private TaskRepository taskRepository;

  @Override
  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  @Override
  public Task getTaskById(Integer id) {
    return taskRepository.findById(id).orElse(null);
  }

  @Override
  public Task saveTask(Task task) {
    return taskRepository.save(task);
  }



}
