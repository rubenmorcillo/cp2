<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Replic;
use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;


class CombateController extends Controller
{
    /**
     * @Route("/combat/{user}", name="combate")
     */
    public function combateAction(User $user)
    {
        $luchador = new Replic();
        $replicas  = $user->getReplics();

        return $this->render('combate.html.twig',  [
            'usuario' => $user,
            'replica' =>$replicas[0]

        ]);
    }
}
