<?php
session_start();
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($data->username) || empty($data->email) || empty($data->password)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Campos obrigatórios não preenchidos']));
    }

    // Verifica se o e-mail já está cadastrado
    $email = $con->real_escape_string($data->email);
    $sql = $con->query("SELECT * FROM user WHERE emailUser = '$email'");
    $existingUser = $sql->fetch_assoc();
    if ($existingUser) {
        http_response_code(400);
        exit(json_encode(['error' => 'E-mail já cadastrado']));
    }

    // Use prepared statements para evitar SQL injection
    $stmt = $con->prepare("INSERT INTO user (usernameUser, emailUser, passwordUser) VALUES (?, ?, ?)");
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
    $stmt->bind_param("sss", $data->username, $data->email, $hashedPassword);

    if ($stmt->execute()) {
        $data->idUser = $con->insert_id;

        // Defina o ID do usuário na variável de sessão
        $_SESSION['idUser'] = $data->idUser;

        // Adicione este log para verificar se o ID do usuário está sendo definido corretamente
        error_log("ID do usuário definido na sessão: " . $_SESSION['idUser']);

        http_response_code(201);
        exit(json_encode($data));
    } else {
        http_response_code(500);
        exit(json_encode(['error' => 'Deu ruim no cadastro']));
    }
}
?>
