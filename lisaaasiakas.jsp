<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<title>Lis�� asiakas</title>
</head>
<body>
<form name="lisaa">
	<table>
		<thead>
			<tr>
				<th colspan="5"	class="oikealle"><a id="linkki" href="listaaasiakkaat.jsp">Takaisin</a></th>
			</tr>
			<tr>
			    <th>ID</th>
				<th>Etunimi</th>
				<th>Sukunimi</th>
				<th>Puhelin</th>
				<th>S�hk�posti</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="text" name="etunimi" id="etunimi" /></td>
				<td><input type="text" name="sukunimi" id="sukunimi" /></td>
				<td><input type="text" name="puhelin" id="puhelin" /></td>
				<td><input type="text" name="sposti" id="sposti" /></td>
				<td><input type="button" value="Lis�� asiakas" onclick="lisaanyt()"></td>
			</tr>
		</tbody>
	</table>
</form>
		
<p id="ilmo"></p>
</body>
</html>