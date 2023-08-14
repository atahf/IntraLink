package com.atahf.IntraLink.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Permissions {

    boolean Read;
    boolean Add;
    boolean Change;
    boolean Delete;

    @Override
    public String toString() {
        StringBuilder res = new StringBuilder();

        res.append(this.isRead() ? "1" : "0");
        res.append(this.isAdd() ? "1" : "0");
        res.append(this.isChange() ? "1" : "0");
        res.append(this.isDelete() ? "1" : "0");

        return res.toString();
    }

    public Permissions(String input) {
        if (input == null || input.length() < 4) {
            throw new IllegalArgumentException("Input string must have at least 4 characters.");
        }

        this.setRead(input.charAt(0) == '1');
        this.setAdd(input.charAt(1) == '1');
        this.setChange(input.charAt(2) == '1');
        this.setDelete(input.charAt(3) == '1');
    }
}
