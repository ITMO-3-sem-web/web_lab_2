//package ru.arina.maxim;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.PrintWriter;
//
//public class MainServlet extends HttpServlet {
//
//    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//
//        req.setAttribute("name", "MaximArina");
//
////        req.getRequestDispatcher("firstPage.jsp").forward(req, resp);
//
//        req.getRequestDispatcher("index.jsp").forward(req, resp);
//
//
////        PrintWriter out = resp.getWriter();
////        out.print("<h1>Hello Servlet</h1>");
////        System.out.println("Bugaga");
//
//
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//
//        super.doPost(req, resp);
//    }
//
//}