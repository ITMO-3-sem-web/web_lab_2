package ru.arina.maxim.servlet;

import ru.arina.maxim.model.Point;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class ControllerServlet extends HttpServlet {


    private ArrayList<Point> history;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println("Got a request");
//        throw new IllegalArgumentException("got");

        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        System.out.println(" x = " + x + "  y = " + y + "  r = " + r);


        if (request.getSession().getAttribute("history") == null) {

            history = new ArrayList<>();
//            history.add(new Point("1", "2", "2", "ДА"));
            request.getSession().setAttribute("history", history);
        }

        System.out.println("history init = " + history + "\n---");

//        request.setAttribute("history", history);

        if (x == null && y == null && r == null) {
            System.out.println(1);
            RequestDispatcher dispatcher = request.getRequestDispatcher("/index.jsp");
            dispatcher.forward(request, response);
        } else {
            System.out.println(2);
            getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
//            getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
//            RequestDispatcher dispatcher = request.getRequestDispatcher("/error.jsp");
//            dispatcher.forward(request, response);

        }
    }
}
