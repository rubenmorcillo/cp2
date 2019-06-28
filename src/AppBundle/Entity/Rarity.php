<?php
/**
 * Created by PhpStorm.
 * User: Rubén
 * Date: 25/06/2019
 * Time: 20:49
 */

namespace AppBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="rarity")
 */
class Rarity
{
    public function __construct()
    {
        $this->mercenary = new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    private $literal;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @ORM\Column(type="decimal")
     * @var float
     */
    private $rate;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Mercenary", mappedBy="rarity")
     * @var Mercenary[]
     * @ORM\JoinColumn(nullable=true)
     */
    private $mercenary;

    /**
     * @return string
     */
    public function getLiteral()
    {
        return $this->literal;
    }

    /**
     * @param string $literal
     * @return Rarity
     */
    public function setLiteral($literal)
    {
        $this->literal = $literal;
        return $this;
    }



    /**
     * @return float
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * @param float $rate
     * @return Rarity
     */
    public function setRate($rate)
    {
        $this->rate = $rate;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMercenary()
    {
        return $this->mercenary;
    }

    /**
     * @param mixed $mercenary
     * @return Rarity
     */
    public function setMercenary($mercenary)
    {
        $this->mercenary = $mercenary;
        return $this;
    }

    public function __toString()
    {
        $i = $this->getId();
        $rz = 'culo'.$i;
        switch ($i) {
            case 0:
                $rz = 'comun';
                break;
            case 1:
                $rz = 'inusual';
                break;
            case 2:
                $rz = 'rara';
                break;
            case 3:
                $rz = 'leyenda';
                break;
        }
        return $rz;
    }
}