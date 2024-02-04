<?php
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['idUser'])) {
        $id = $con->real_escape_string($_GET['idUser']);
        $sql = $con->query("SELECT * FROM user WHERE idUser = '$id'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['usernameUser'])) {
        $username = $con->real_escape_string($_GET['usernameUser']);
        $sql = $con->query("SELECT * FROM user WHERE usernameUser = '$username'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['emailUser'])) {
        $email = $con->real_escape_string($_GET['emailUser']);
        $sql = $con->query("SELECT * FROM user WHERE emailUser = '$email'");
        $data = $sql->fetch_assoc();
    } else {
        $sql = $con->query("SELECT * FROM user");
        $data = [];
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }
    exit(json_encode($data));
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $putData);

    if (isset($putData['idUser'])) {
        $id = $con->real_escape_string($putData['idUser']);
        $data = json_decode(file_get_contents("php://input"));

        $stmt = $con->prepare("UPDATE user SET nome = ?, emailUser = ?, passwordUser = ? WHERE idUser = ?");
        $stmt->bind_param("sssi", $data->nome, $data->email, $data->password, $id);

        if ($stmt->execute()) {
            exit(json_encode(['status' => 'sucesso']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['idUser'])) {
        $id = $con->real_escape_string($_GET['idUser']);
        $sql = $con->query("DELETE FROM user WHERE idUser = '$id'");

        if ($sql) {
            exit(json_encode(['status' => 'sucesso']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
}
?>
