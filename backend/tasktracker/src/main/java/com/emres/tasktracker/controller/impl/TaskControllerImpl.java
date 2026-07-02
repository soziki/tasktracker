package com.emres.tasktracker.controller.impl;

import java.util.List;

import org.aspectj.internal.lang.annotation.ajcDeclareEoW;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emres.tasktracker.controller.ITaskController;
import com.emres.tasktracker.model.Task;
import com.emres.tasktracker.service.ITaskService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/tasks")
public class TaskControllerImpl implements ITaskController {
  @Autowired
  private ITaskService taskService;

  @GetMapping("/")
  @Override
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @GetMapping("/{id}")
  @Override
  public Task getTaskById(@PathVariable(name = "id") Integer id) {
      return taskService.getTaskById(id);
  }


  @PostMapping("/")
  @Override
  public Task saveTask(@RequestBody Task task) {
      return taskService.saveTask(task);
  }
  
  @PutMapping("/{id}")
  @Override
  public Task updateTask(@PathVariable(name = "id") Integer id, @RequestBody Task taskDetails) {      
      return null;
  }

  @DeleteMapping("/{id}")
  @Override
  public Task deleteTask(@PathVariable(name = "id") Integer Id) {
    return null;
  }
  
  
}
