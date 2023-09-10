package com.atahf.IntraLink.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserPermission {
    USER_ADD("user:add"),
    USER_READ("user:read"),
    USER_EDIT("user:edit"),
    USER_DELETE("user:delete"),
    TICKET_ADD("ticket:add"),
    TICKET_READ("ticket:read"),
    TICKET_HANDLE("ticket:handle"),
    TICKET_REMOVE("ticket:remove"),
    LOG_READ("log:read");


    private final String permission;
}
