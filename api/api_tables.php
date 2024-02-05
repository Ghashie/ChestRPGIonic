<?php
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  exit();
}

date_default_timezone_set('America/Sao_Paulo');
@session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"));

  // Verifica se os campos obrigatórios estão preenchidos
  if (empty($data->nameTable) || empty($data->descriptionTable) || empty($data->passwordTable)) {
      http_response_code(400); // Código de status 400 (Bad Request) para indicar que há campos nulos
      exit(json_encode(['error' => 'Campos obrigatórios não preenchidos']));
  }

  // Gera um código aleatório de 6 caracteres (números e letras)
  $codeTable = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 6);

  // Use prepared statements para evitar SQL injection
  $stmt = $con->prepare("INSERT INTO tables (nameTable, descriptionTable, passwordTable, codeTable, idAdmin) VALUES (?, ?, ?, ?, ?)");
  $hashedPassword = password_hash($data->passwordTable, PASSWORD_DEFAULT);
  $stmt->bind_param("ssssi", $data->nameTable, $data->descriptionTable, $hashedPassword, $codeTable, $_SESSION['idUser']);  // Supondo que $_SESSION['userId'] contenha o ID do usuário logado

  if ($stmt->execute()) {
      $data->idTable = $con->insert_id;
      $data->codeTable = $codeTable;
      http_response_code(201); // Código de status 201 (Created) para indicar sucesso na criação da mesa
      exit(json_encode($data));
  } else {
      http_response_code(500); // Código de status 500 (Internal Server Error) para indicar falha no servidor
      exit(json_encode(['error' => 'Erro ao criar a mesa']));
  }
}







http_response_code(404); // Not Found
exit(json_encode(['status' => 'Endpoint Not Found']));