package ru.arina.maxim.model;


import java.util.Objects;



public class Point {


    private String x;
    private String r;
    private String y;
    private String result;



    public Point(String x, String y, String r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }


    public Point(String x, String y, String r, String result) {
        this(x, y, r);
        this.result = result;
    }


    @Override
    public boolean equals(Object otherObject) {
        if (this == otherObject) return true;
        if (otherObject == null) return false;
        if (getClass() != otherObject.getClass()) return false;
        Point other = (Point) otherObject;
        return Objects.equals(x, other.getX())
                && Objects.equals(y, other.getY())
                && Objects.equals(r, other.getR())
                && Objects.equals(result, other.getResult());
    }


    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, result);
    }


    public String getX() {
        return x;
    }


    public void setX(String x) {
        this.x = x;
    }


    public String getR() {
        return r;
    }


    public void setR(String r) {
        this.r = r;
    }


    public String getY() {
        return y;
    }


    public void setY(String y) {
        this.y = y;
    }


    public String getResult() {
        return result;
    }


    public void setResult(String result) {
        this.result = result;
    }



}


