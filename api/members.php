<?php
session_start();
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['idTable'])) {
        $idTable = $con->real_escape_string($_GET['idTable']);
        $sql = $con->query("SELECT * FROM members WHERE idTable = '$idTable'");
        $data = [];
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
        exit(json_encode($data));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $putData);

    if (isset($putData['idMember'])) {
        $idMember = $con->real_escape_string($putData['idMember']);
        $data = json_decode(file_get_contents("php://input"));

        $stmt = $con->prepare("UPDATE members SET isAdmin = ? WHERE idMember = ?");
        $stmt->bind_param("ii", $data->isAdmin, $idMember);

        if ($stmt->execute()) {
            exit(json_encode(['status' => 'sucesso']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['idMember'])) {
        $idMember = $con->real_escape_string($_GET['idMember']);
        $sql = $con->query("DELETE FROM members WHERE idMember = '$idMember'");

        if ($sql) {
            exit(json_encode(['status' => 'sucesso']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
} else {
    http_response_code(404);
    exit(json_encode(['status' => 'Endpoint Not Found']));
}
?>
