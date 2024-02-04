<?php
session_start();
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idPlayer = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : null;

    if (!$idPlayer) {
        http_response_code(401);
        exit(json_encode(['error' => 'Usuário não autenticado']));
    }

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->codeTable)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Código da mesa não fornecido']));
    }

    $codeTable = $con->real_escape_string($data->codeTable);
    $sql = $con->query("SELECT * FROM tables WHERE codeTable = '$codeTable'");
    $table = $sql->fetch_assoc();

    if (!$table) {
        http_response_code(404);
        exit(json_encode(['error' => 'Mesa não encontrada']));
    }

    // Verifica se o jogador já é o criador da mesa
    if ($table['idAdmin'] == $idPlayer) {
        http_response_code(403);
        exit(json_encode(['error' => 'Você já é o criador desta mesa']));
    }

    // Verifica se o jogador já é um membro desta mesa
    $sql = $con->query("SELECT * FROM members WHERE idUser = '$idPlayer' AND idTable = '{$table['idTable']}'");
    $existingMember = $sql->fetch_assoc();

    if ($existingMember) {
        http_response_code(403);
        exit(json_encode(['error' => 'Você já é um membro desta mesa']));
    }

    $stmt = $con->prepare("INSERT INTO members (idUser, idTable, isAdmin) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $idPlayer, $table['idTable'], 0); // 0 indica que o jogador não é um admin

    if ($stmt->execute()) {
        http_response_code(201);
        exit(json_encode(['status' => 'sucesso']));
    } else {
        http_response_code(500);
        exit(json_encode(['error' => 'Erro ao juntar-se à mesa']));
    }
} else {
    http_response_code(404);
    exit(json_encode(['status' => 'Endpoint Not Found']));
}
?>
