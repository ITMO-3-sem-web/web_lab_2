<%@ page import="ru.arina.maxim.model.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<!DOCTYPE html>
<html>

<head>
    <title>lab_2</title>
    <meta charset="utf-8">

    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>


<body>
<header>
    <h1 class="header-title">Лабораторная работа №2 по Веб-программированию.</h1>
    <p class="header-content">
        <span class="line-title">Вариант:</span> 4553
        <br>
        <span class="line-title">Студенты:&nbsp;</span> Арина Стенина и Максим Монахов
        <br>
        <span class="line-title">Группа:&nbsp;&nbsp;&nbsp;</span> P3211

    </p>
</header>

<main>
    <article>


        <canvas id="canvass" width="340" height="340">    <p>Your browser doesn't support canvas.</p>   </canvas>



    </article>




    <article>

        <table id="result-table">
            <thead>
            <tr>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">R</th>
                <th scope="col">Точка попала в область</th>
            </tr>
            </thead>

            <tbody>

            <%
                System.out.println(6);
                ArrayList<Point> history = (ArrayList<Point>) request.getSession().getAttribute("history");
                System.out.println(7);
                System.out.println("history = \n" + history + "\n--------");



                StringBuilder output = new StringBuilder();
                Point point;
                String resultClass = "";


                for (int i = history.size() - 1; i >= 0; i--) {
                    point = history.get(i);

                    if (point.getResult().equals("ДА")) {
                        resultClass = "server-answer-yes";
                    } else {
                        resultClass = "server-answer-no";
                    }

                    output.append(
                            "<tr>" +

                                    "<td>" + point.getX() + "</td>" +
                                    "<td>" + point.getY() + "</td>" +
                                    "<td>" + point.getR() + "</td>" +
                                    String.format("<td class='%s'>", resultClass) + point.getResult() + "</td>" +

                            "</tr>"
                    );
                }

                out.println(output.toString());
            %>

            </tbody>
        </table>
        
        <a href="index.jsp">Отправить форму еще раз.</a>

    </article>


</main>


<footer>
    <p class="footer-text"> View code on GitHub</p>
    <a href="https://github.com/ITMO-Web-2nd-year/web_lab_2" target="_blank"> <img class="github-link-img" src="resources/GitHub-Mark-32px.png"> </a>
</footer>

<!--
        <script>
            $(document).ready
        </script>
-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>

<script src="js/result.js"></script>
</body>
</html>