<?php
/**
 * Created by PhpStorm.
 * User: Rubén
 * Date: 25/06/2019
 * Time: 20:58
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="replic")
 */
class Replic
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="replics")
     * @ORM\JoinColumn(nullable=true)
     * @var User
     */
    private $owner;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Mercenary", inversedBy="copys")
     * @var Mercenary
     */
    private $mercenary;

    /**
     * @ORM\Column(type="bigint")
     * @var int
     */
    private $exp;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     * @return Replic
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;
        return $this;
    }

    /**
     * @return Mercenary
     */
    public function getMercenary()
    {
        return $this->mercenary;
    }

    /**
     * @param Mercenary $mercenary
     * @return Replic
     */
    public function setMercenary($mercenary)
    {
        $this->mercenary = $mercenary;
        return $this;
    }

    /**
     * @return int
     */
    public function getExp()
    {
        return $this->exp;
    }

    /**
     * @param int $exp
     * @return Replic
     */
    public function setExp($exp)
    {
        $this->exp = $exp;
        return $this;
    }

    public function getLevel(){
        $lvl = $this->getExp() / 50;
        round($lvl,0, PHP_ROUND_HALF_DOWN);
        return $lvl;
    }

}