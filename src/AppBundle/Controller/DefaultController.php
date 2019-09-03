<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Replic;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        if ($this->getUser() <> null ){
            return $this->render('juego/main.html.twig', [

            ]);
        }
        // replace this example code with whatever you need
        return $this->render('juego/inicio.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/probar", name="probar")
     */
    public function probarAction()
    {
        // replace this example code with whatever you need
        return $this->render('juego/combate.html.twig', [
        ]);
    }
    /**
     * @Route("/marraneo/", name="marraneo")
     */
    public function marraneoAction()
    {
       $replicas = $this->getUser()->getReplics();
        // replace this example code with whatever you need
        return $this->render('pruebas/marraneo.twig', [
            'replicas' => $replicas
        ]);
    }

    /**
     * @Route("/marraneoLucha/{aliado}", name="marraneoLucha")
     */
    public function marraneoLuchaAction(Replic $aliado){
        return $this->render('pruebas/combate.html.twig',[
            'aliado' => $aliado
            ]);
    }

    /**
     * @Route("/phaser", name="phaser")
     */
    public function phaserAction()
    {
        // replace this example code with whatever you need
        return $this->render( 'juego/combate.html.twig', [
        ]);
    }
}
