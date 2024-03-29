<?php
    //acesso de controle para uma api poder buscar as informações aqui
    header('Access-Control-Allow-Origin: http://localhost:8100');
    // indicando que será utilizado json
    header('Content-Type: application/json');
    // indicação dos métodos que serão permitidos neste arquivo
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    // compilado de informações que são obrigatórias no header
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    // definição do fuso horário

