package com.atahf.IntraLink.userLogs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogDao extends JpaRepository<Log,Long> {

    Log findLogById(Long id);

    List<Log> findAllByOrderBySubmission_date();
}
