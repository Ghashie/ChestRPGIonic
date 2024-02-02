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

http_response_code(404); // Not Found
exit(json_encode(['status' => 'Endpoint Not Found']));