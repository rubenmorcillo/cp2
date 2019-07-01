<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends Controller
{

    /**
     * @Route("/main/{user}", name="inicio_usuario", requirements={"id": "\d+"});
     */
    public function mainAction(User $user)
    {
        return $this->render('juego/main.html.twig', [
            'usuario' => $user
        ]);
    }
}
