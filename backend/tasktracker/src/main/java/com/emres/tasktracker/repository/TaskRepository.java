package com.emres.tasktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emres.tasktracker.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
