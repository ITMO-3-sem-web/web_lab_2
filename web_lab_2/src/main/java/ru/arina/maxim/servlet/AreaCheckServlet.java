package ru.arina.maxim.servlet;



import ru.arina.maxim.model.Point;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class AreaCheckServlet extends HttpServlet {
    private static final String wrongFormat = "Неверный формат данных";
    private static final String inZone = "ДА";
    private static final String outZone = "НЕТ";
    private ArrayList<Point> history;
    boolean validX;
    boolean validR;
    boolean validY;



    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("area Check");

        final String x = req.getParameter("x");
        final String y = req.getParameter("y");
        final String r = req.getParameter("r");

        System.out.println("x = " + x + "  y = " + y + "  r = " + r);
        Point point;
        if (x != null && y != null && r != null && isValid(x, y, r)) {
            final double X = Double.parseDouble(x);
            final double Y = Double.parseDouble(y);
            final double R = Double.parseDouble(r);
            //check area
            if (X < 0) {
                if (Y <= 0) {
                    if (Math.pow(X, 2) + Math.pow(Y, 2) <= Math.pow(R/2, 2)) {
                        point = new Point(x, y, r, inZone);
                    } else {
                        point = new Point(x, y, r, outZone);
                    }
                } else {
                    point = new Point(x, y, r, outZone);
                }
            } else {
                if (Y >= 0) {
                    if (Y <= R && X <=R){
                        point = new Point(x, y, r, inZone);
                    }else{
                        point = new Point(x, y, r, outZone);
                    }
                } else {
                    if (Y >= X - R) {
                        point = new Point(x, y, r, inZone);
                    } else {
                        point = new Point(x, y, r, outZone);
                    }
                }
            }

            if (req.getSession().getAttribute("history") == null){
                history = new ArrayList<>();
            }
            else {
                history = (ArrayList<Point>) req.getSession().getAttribute("history");
            }
            DecimalFormat format = new DecimalFormat("#.####");
            point.setY(format.format(Y));
            history.add(point);
//            req.getSession().setAttribute("history", history);

            System.out.println("forwarding result.jsp");
//        try (PrintWriter printWriter = resp.getWriter()) {
//          printWriter.println("<h1>Title</h1>");
//        }


            RequestDispatcher dispatcher = req.getRequestDispatcher("/result.jsp");
            dispatcher.forward(req, resp);

        } else {
//            point = new Point(x, y, r, wrongFormat);
            RequestDispatcher dispatcher = req.getRequestDispatcher("/error.jsp");
            dispatcher.forward(req, resp);
        }

        //session



    }


//    public boolean isCanvasValid(String x, String y, String r){
//        validX = false;
//        validR = false;
//        try{
//            Double.parseDouble(y);
//            Double.parseDouble(x);
//            for (int i=1; i<=5; i++) {
//                if (i == Integer.parseInt(r)) {
//                    validR = true;
//                }
//            }
//        }catch (NumberFormatException ex){
//            return false;
//        }
//        return (validR && validX);
//    }

    public boolean isValid(String x, String y, String r){

        validX = false;
        validY = false;
        validR = false;


        try {
            System.out.println("4");

            double tmpX = Double.parseDouble(x);
            double tmpY = Double.parseDouble(y);
            int tmpR = Integer.parseInt(r);


            if ( (tmpX % 0.5 == 0) && (-2 <= tmpX) && (tmpX <= 2) ) {
                validX = true;
            }

            if ( (tmpY > -3) && (tmpY < 3) ) {
                validY = true;
            }

            if ( (tmpR >= 1) && (tmpR <= 5) ) {
                validR = true;
            }

        } catch (NumberFormatException e){
            System.out.println(5);
            return false;
        }


        return ( validX && validY && validR );

    }

}


