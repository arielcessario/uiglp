<?php
/**
 * Created by PhpStorm.
 * Cliente: kn
 * Date: 16/03/15
 * Time: 19:13
 */

session_start();
if (file_exists('../../../MyDBi.php')) {
    require_once '../../../MyDBi.php';
} else {
    require_once '../MyDBi.php';
}


$data = file_get_contents("php://input");

$decoded = json_decode($data);

if ($decoded != null) {
    if ($decoded->function == 'create') {
        create($decoded->item);
    } else if ($decoded->function == 'update') {
        update($decoded->item);
    } else if ($decoded->function == 'delete') {
        delete($decoded->item);
    }
} else {
    $function = $_GET["function"];
    if ($function == 'get') {
        get();
    }
}


function get()
{
    $db = new MysqliDb();
    $results = $db->get('ofertas_laborales');
    echo json_encode($results);
}

function delete($item)
{
    $db = new MysqliDb();
    $decoded = json_decode($item);

    $db->where('oferta_laboral_id', $decoded->oferta_laboral_id);

    $results = $db->delete('ofertas_laborales');
    echo json_encode($results);
}

function create($item)
{
    $db = new MysqliDb();
    $decoded = json_decode($item);
    $data = array(
        'titulo' => $decoded->titulo,
        'detalle' => $decoded->detalle,
        'cliente_id' => 1/*El cliente viene de JWT*/,
        'status' => 1
    );

    $result = $db->insert('ofertas_laborales', $data);
    if ($result > -1) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}

/**
 * esta funcion me retorna un cliente filtrando x email
 * @param $email
 */

function update($item)
{
    $db = new MysqliDb();
    $decoded = json_decode($item);

    $db->where('oferta_laboral_id', $decoded->oferta_laboral_id);


    $data = array(
        'titulo' => $decoded->titulo,
        'detalle' => $decoded->detalle,
        'cliente_id' => 1/*El cliente viene de JWT*/,
        'status' => 1
    );

    if ($db->update('ofertas_laborales', $data)) {
        echo json_encode(['result' => true]);
    } else {
        echo json_encode(['result' => false]);
    }
}
