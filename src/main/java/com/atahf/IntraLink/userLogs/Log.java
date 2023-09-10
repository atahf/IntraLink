package com.atahf.IntraLink.userLogs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String description;
    private LocalDateTime submissionDate;

    public Log(String username, String description) {
        this.username = username;
        this.description = description;
        this.submissionDate = LocalDateTime.now();
    }
}
