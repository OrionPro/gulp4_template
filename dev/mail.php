<?php

define('__ROOT__', dirname(__FILE__));
require_once __ROOT__ . '/PHPMailer/class.phpmailer.php';

if ($_POST) {
	$json = array(); // подготовим массив ответа

	if(isset($_POST['form_type'])){
		$id_form = $_POST['form_type'];
		$json['form_type'] = $id_form;
	}
    // для примера, если мы хотим проверять конкретно какая форма со значением скрытого input ( в данном случае form_name) сейчас проверяется и после success в js файле, что то надо именно там сделать (data['form_name'] == 'Посетить первое занятие') - то
    if(isset($_POST['form_name'])){
        $name_form = $_POST['form_name'];
        $json['form_name'] = $name_form;
    }
   
	 if (isset($_POST['form_name']) and $_POST['form_name'] != "") {
		$form_name = $_POST['form_name'];
		$message .= '
		<h1>Вам сообщение!</h1>
		<div style="font-size: 18px; margin-bottom: 10px">Из формы: ' . '<span style="font-size: 18px"> ' . $form_name . '</span>' . '</div>';
	}
	if (isset($_POST['name']) and $_POST['name'] != "") {
		$name = $_POST['name'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Имя: ' . $name . '</div>';
	}
	if (isset($_POST['phone']) and $_POST['phone'] != "") {
        $phone = $_POST['phone'];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Телефон: ' . $phone . '</div>';
    }
    if (isset($_POST['phone_mask']) and $_POST['phone_mask'] != "") {
        $phone_mask = $_POST['phone_mask'];
        $message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Телефон: ' . $phone_mask . '</div>';
    }
	if (isset($_POST['email']) and $_POST['email'] != "") {
		$email = $_POST['email'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Email: ' . $email . '</div>';
	}
	if (isset($_POST['textarea']) and $_POST['textarea'] != "") {
		$textarea = $_POST['textarea'];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Описание в texarea: ' . $textarea . '</div>';
	}
	 if(isset($_POST["services"]) and $_POST['services'] != "") {
		$services = $_POST["services"];
		$message .= '<div style="font-size: 18px; margin-bottom: 10px; padding-left: 10px">Select: ' . $services . '</div>';
	}


	$mailer = new PHPMailer();
	$subject = "Заявка с сайта Название сайта";
	$to = 'orionpro79@gmail.com';
 //   $mailer->IsSMTP();
	$mailer->Host = 'smtp.yandex.ru';
	$mailer->Port = 465;
	$mailer->SMTPSecure = "ssl";
	$mailer->SMTPAuth = true;
	$mailer->Username = 'efimenko-i-d@yandex.ua';
	$mailer->Password = 'TabvtyrjBujhm06';
	$mailer->From = 'you@example.com';
	$mailer->FromName = 'Your Name';
	$mailer->CharSet = "UTF-8";
	$mailer->Subject = $subject;
	$mailer->MsgHTML($message);
	$mailer->AddAddress($to);

	//Upload Files

	foreach ($_FILES as $file) {


		$ext = '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        // раскомментировать если хотим сделать уникальное имя файла
//		while (true) {
//			$filename = uniqid(rand(), true) . $ext;
//
//
//			if (!file_exists(__ROOT__ . '\uploads\\' . $filename)) {
//				break;
//			}
//		}
        $filename = $ext; // убрать этот код, когда раскомментируем wile чтобы сделать уникальное имя файла

		move_uploaded_file($file['tmp_name'], __ROOT__ . '\uploads\\' . $filename);
		$file_to_attach = __ROOT__ . '\uploads\\' . $filename;
		$mailer->AddAttachment($file_to_attach, $file['name']); // если раскомментировать вверху wile и добавить в AddAttachment вместо $file['name'] - $filename то будет работать уникальное имя
		// $images[] = __ROOT__ . '\uploads\\' . $filename;
	}

	if ($mailer->Send()) {
		$json['error'] = 0;
	} else {
		$json['error'] = 1;
	}

	echo json_encode($json);
}