<?php

namespace AppBundle\Controller;

use AppBundle\Repository\MercenaryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class MercenaryController extends Controller
{
    /**
     * @Route("/mercs", name="mercenarios")
     */
    public function listAction(MercenaryRepository $mr)
    {
        $mercenarios = $mr->findAll();
        return $this->render('Mercenary/list.html.twig', [
            'mercenarios' => $mercenarios
        ]);
    }
}
