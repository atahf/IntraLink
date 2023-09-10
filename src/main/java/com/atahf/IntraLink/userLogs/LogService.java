package com.atahf.IntraLink.userLogs;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LogService {
    private final LogDao logDao;

    public LogService(LogDao logDao) {
        this.logDao = logDao;
    }

    @Transactional
    public void addLog(String username, String description) {
        Log newLog = new Log(username, description);

        logDao.save(newLog);
    }

    public List<Log> getLogs() {
        return logDao.findAllByOrderBySubmissionDate();
    }

    public Log getLog(Long logId) {
        return logDao.findLogById(logId);
    }
}
