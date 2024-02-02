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

if (!isset($_SESSION['idUser'])) {
  http_response_code(401); // Unauthorized
  exit(json_encode(['error' => 'Usuário não autenticado']));
}