package com.atahf.IntraLink.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.atahf.IntraLink.security.UserPermission.*;

public enum UserRole {
    SUPER(Sets.newHashSet(USER_ADD, USER_READ, USER_EDIT, USER_DELETE, TICKET_ADD, TICKET_READ, TICKET_HANDLE, TICKET_REMOVE, LOG_READ)),
    IT(Sets.newHashSet(USER_READ, USER_EDIT, TICKET_ADD, TICKET_READ, TICKET_HANDLE)),
    IT_ADMIN(Sets.newHashSet(USER_READ, USER_EDIT, TICKET_ADD, TICKET_READ, TICKET_HANDLE, TICKET_REMOVE, LOG_READ)),
    HR(Sets.newHashSet(USER_ADD, USER_READ, USER_EDIT, USER_DELETE, TICKET_ADD)),
    EMPLOYEE(Sets.newHashSet(TICKET_ADD));

    private final Set<UserPermission> permissions;

    UserRole(Set<UserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<UserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}