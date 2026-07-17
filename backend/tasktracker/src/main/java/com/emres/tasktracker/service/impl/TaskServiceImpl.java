package com.emres.tasktracker.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
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

  @Override
  public Task updateTask(Integer id, Task taskDetails) {
    Task taskToBeUpdated = taskRepository.findById(id).orElse(null);
    BeanUtils.copyProperties(taskDetails, taskToBeUpdated, "id", "taskStartDate");
    return taskRepository.save(taskToBeUpdated);
  }

  @Override
  public Task deleteTask(Integer id) {
    Task taskToBeDeleted = taskRepository.findById(id).orElse(null);
    taskRepository.deleteById(id);
    return taskToBeDeleted;
  }

}
