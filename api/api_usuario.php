<?php
require_once 'headers.php';
require_once 'conexao.php';

date_default_timezone_set('America/Sao_Paulo');
@session_start();

// Verifique se a conexão foi estabelecida corretamente
if ($con->connect_error) {
    die("Erro na conexão com o banco de dados: " . $con->connect_error);
}

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
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Use prepared statements para evitar SQL injection
    $stmt = $con->prepare("INSERT INTO users (usernameUser, emailUser, passwordUser) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data->nome, $data->email, $data->password);

    if ($stmt->execute()) {
        $data->id = $con->insert_id;
        exit(json_encode($data));
    } else {
        exit(json_encode(['status' => 'Deu ruim']));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['idUser'])) {
        $id = $con->real_escape_string($_GET['idUser']);
        $data = json_decode(file_get_contents("php://input"));

        // Use prepared statements para evitar SQL injection
        $stmt = $con->prepare("UPDATE user SET nome = ?, emailUser = ?, passwordUser = ? WHERE idUser = ?");
        $stmt->bind_param("sssi", $data->nome, $data->email, $data->password, $id);

        if ($stmt->execute()) {
            exit(json_encode(['status' => 'successo']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['idUser'])) {
        $id = $con->real_escape_string($_GET['idUser']);
        $sql = $con->query("DELETE FROM user WHERE idUser = '$id'");

        if ($sql) {
            exit(json_encode(['status' => 'successo']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
}

// Se chegou aqui, a requisição não corresponde a nenhum método esperado
http_response_code(400);
exit(json_encode(['status' => 'Requisição inválida']));
?>
