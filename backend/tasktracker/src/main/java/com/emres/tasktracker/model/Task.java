package com.emres.tasktracker.model;

import java.time.LocalDate;

import com.emres.tasktracker.enums.TaskStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "task_name")
  private String taskName;

  @Column(name = "task_description", nullable = false)
  private String taskDescription;

  @Column(name = "task_start_date", nullable = false)
  private LocalDate taskStartDate;

  @Column(name = "task_due_date", nullable = false)
  private LocalDate taskDueDate;

  @Column(name = "task_assigned_person", nullable = false)
  private String taskAssignedPerson;

  @Column(name = "task_status", nullable = false)
  @Enumerated(EnumType.STRING)
  private TaskStatus taskStatus;

  @PrePersist
  protected void onCreate() {
    this.taskStartDate = LocalDate.now();
  }

}