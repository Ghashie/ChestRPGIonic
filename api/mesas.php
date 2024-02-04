<?php
header("Access-Control-Allow-Origin: http://localhost:8100");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


session_start();
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idUsuario = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : null;

    if (!$idUsuario) {
        http_response_code(401);
        exit(json_encode(['error' => 'Usuário não autenticado']));
    }

    $sql = $con->query("SELECT t.*, m.idUser AS isMember, m.isAdmin AS isCreator
                       FROM tables t
                       LEFT JOIN members m ON t.idTable = m.idTable AND m.idUser = '$idUsuario'");
    $data = [];
    while ($d = $sql->fetch_assoc()) {
        $data[] = $d;
    }
    exit(json_encode($data));

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idAdmin = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : null;

    if (!$idAdmin) {
        http_response_code(401);
        exit(json_encode(['error' => 'Usuário não autenticado']));
    }

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->nameTable) || empty($data->descriptionTable) || empty($data->passwordTable)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Campos obrigatórios não preenchidos']));
    }

    $codeTable = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 6);

    // Adiciona o ID do administrador à mesa antes de inserir no banco de dados
    $data->idAdmin = $idAdmin;

    $stmt = $con->prepare("INSERT INTO tables (nameTable, descriptionTable, passwordTable, codeTable, idAdmin) VALUES (?, ?, ?, ?, ?)");
    $hashedPassword = password_hash($data->passwordTable, PASSWORD_DEFAULT);
    $stmt->bind_param("ssssi", $data->nameTable, $data->descriptionTable, $hashedPassword, $codeTable, $idAdmin);

    if ($stmt->execute()) {
        $data->idTable = $con->insert_id;
        $data->codeTable = $codeTable;
        http_response_code(201);
        exit(json_encode($data));
    } else {
        http_response_code(500);
        exit(json_encode(['error' => 'Erro ao criar a mesa']));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $putData);

    if (isset($putData['idTable'])) {
        $idTable = $con->real_escape_string($putData['idTable']);
        $data = json_decode(file_get_contents("php://input"));

        $stmt = $con->prepare("UPDATE tables SET nameTable = ?, descriptionTable = ?, passwordTable = ? WHERE idTable = ?");
        $stmt->bind_param("sssi", $data->nameTable, $data->descriptionTable, $data->passwordTable, $idTable);

        if ($stmt->execute()) {
            exit(json_encode(['status' => 'sucesso']));
        } else {
            exit(json_encode(['status' => 'Deu ruim']));
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['idTable'])) {
        $idTable = $con->real_escape_string($_GET['idTable']);
        $sql = $con->query("DELETE FROM tables WHERE idTable = '$idTable'");

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
