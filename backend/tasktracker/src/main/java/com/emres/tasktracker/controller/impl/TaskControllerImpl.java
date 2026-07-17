package com.emres.tasktracker.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.emres.tasktracker.controller.ITaskController;
import com.emres.tasktracker.model.Task;
import com.emres.tasktracker.service.ITaskService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  @PreAuthorize("hasAnyRole('client_admin', 'client_manager')")
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @GetMapping("/usr")
  @Override
  @PreAuthorize("hasRole('client_user')")
  public List<Task> getTasksByKeycloakUsername() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return taskService.getTasksByKeycloakUsername(username);
  }

  @GetMapping("/usr/{id}")
  @Override
  @PreAuthorize("hasRole('client_user')")
  public Task getUserTaskById(@PathVariable(name = "id") Integer id) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    Task task = taskService.getUserTaskById(id, username);
    if (task == null) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
    return task;
  }

  @GetMapping("/{id}")
  @Override
  @PreAuthorize("hasAnyRole('client_admin', 'client_manager')")
  public Task getTaskById(@PathVariable(name = "id") Integer id) {
      return taskService.getTaskById(id);
  }

  @PostMapping("/")
  @Override
  @PreAuthorize("hasAnyRole('client_admin', 'client_manager')")
  public Task saveTask(@RequestBody Task task) {
      return taskService.saveTask(task);
  }
  
  @PutMapping("/{id}")
  @Override
  @PreAuthorize("hasAnyRole('client_admin', 'client_manager')")
  public Task updateTask(@PathVariable(name = "id") Integer id, @RequestBody Task taskDetails) {      
      return taskService.updateTask(id, taskDetails);
  }

  @DeleteMapping("/{id}")
  @Override
  @PreAuthorize("hasAnyRole('client_admin', 'client_manager')")
  public Task deleteTask(@PathVariable(name = "id") Integer Id) {
    return taskService.deleteTask(Id);
  }

}
