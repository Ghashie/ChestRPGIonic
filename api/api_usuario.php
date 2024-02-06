<?php
require_once 'headers.php';
require_once 'conexao.php';
require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit();
}

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
        // Verifica a senha usando password_verify
        if ($data && isset($_GET['passwordUser'])) {
            if (password_verify($_GET['passwordUser'], $data['passwordUser'])) {
                $tokenData = [
                  'idUser' => $data['idUser'],
                  'usernameUser' => $data['usernameUser'],
                  'emailUser' => $data['emailUser']
                ];

                $secretKey = "senac";
                $token = JWT::encode($tokenData, $secretKey, 'HS256');

                exit(json_encode(['token' => $token, 'user' => $data]));
            } else {
                http_response_code(401); // Unauthorized
                exit(json_encode(['error' => 'Credenciais inválidas']));
            }
        }
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

    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($data->username) || empty($data->email) || empty($data->password)) {
        http_response_code(400); // Código de status 400 (Bad Request) para indicar que há campos nulos
        exit(json_encode(['error' => 'Campos obrigatórios não preenchidos']));
    }

    // Verifica se o e-mail já está cadastrado
    $email = $con->real_escape_string($data->email);
    $sql = $con->query("SELECT * FROM user WHERE emailUser = '$email'");
    $existingUser = $sql->fetch_assoc();
    if ($existingUser) {
        http_response_code(400); // Código de status 400 (Bad Request) para indicar que o e-mail já está cadastrado
        exit(json_encode(['error' => 'E-mail já cadastrado']));
    }

    // Use prepared statements para evitar SQL injection
    $stmt = $con->prepare("INSERT INTO user (usernameUser, emailUser, passwordUser) VALUES (?, ?, ?)");
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
    $stmt->bind_param("sss", $data->username, $data->email, $hashedPassword);

    if ($stmt->execute()) {
        $data->idUser = $con->insert_id;
        $_SESSION['idUser'] = $data->idUser;
        http_response_code(201); // Código de status 201 (Created) para indicar sucesso no cadastro
        exit(json_encode($data));
    } else {
        http_response_code(500); // Código de status 500 (Internal Server Error) para indicar falha no servidor
        exit(json_encode(['error' => 'Deu ruim no cadastro']));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $putData);

    // Verifique a existência do token
    $token = null;
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $token = $headers['Authorization'];
    }

    if (!$token) {
        http_response_code(401); // Unauthorized
        exit(json_encode(['error' => 'Token ausente']));
    }

    // Decodifique o token
    $secretKey = "senac";
    try {
        $decoded = JWT::decode($token, $secretKey);
        // Os dados do usuário estarão em $decoded
    } catch (Exception $e) {
        http_response_code(401); // Unauthorized
        exit(json_encode(['error' => 'Token inválido', 'details' => $e->getMessage()]));
    }

    // Verifique se o ID do usuário no token corresponde ao ID enviado na requisição
    if ($decoded->idUser != $putData['idUser']) {
        http_response_code(403); // Forbidden
        exit(json_encode(['error' => 'Usuário não autorizado a editar este perfil']));
    }

    // Continue com a lógica de atualização de perfil
    $id = $con->real_escape_string($putData['idUser']);
    $data = json_decode(file_get_contents("php://input"));

    // Use prepared statements para evitar SQL injection
    $stmt = $con->prepare("UPDATE user SET usernameUser = ?, emailUser = ? WHERE idUser = ?");
    $stmt->bind_param("ssi", $data->username, $data->email, $id);

    if ($stmt->execute()) {
        exit(json_encode(['status' => 'successo']));
    } else {
        exit(json_encode(['status' => 'Deu ruim', 'db_error' => $con->error]));
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
if ($stmt->execute()) {
    $data->id = $con->insert_id;
    http_response_code(201); // Código de status 201 (Created) para indicar sucesso no cadastro
    exit(json_encode($data));
} else {
    http_response_code(500); // Código de status 500 (Internal Server Error) para indicar falha no servidor
    exit(json_encode(['status' => 'Deu ruim']));
}

