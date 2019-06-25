<?php


namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @ORM\Table(name="User")
 */
class User implements UserInterface
{


    public function __construct()
    {
        $this->replics=new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @var int
     */
    private $id;



    /**
     * @ORM\Column(type="string", unique=true)
     * @Assert\Length(min=4, minMessage="Debe tener al menos 4 caracteres")
     * @Assert\NotBlank()
     * @var String
     */
    private $login;

    /**
     * @ORM\Column(type="string", unique=true)
     * @Assert\Length(min=4, minMessage="Debe tener al menos 4 caracteres")
     * @Assert\NotBlank()
     * @var String
     */
    private $nick;

    /**
     * @ORM\Column(type="string")
     * @Assert\Length(min=6, minMessage="Debe tener al menos 6 caracteres")
     * @Assert\NotBlank()
     * @var String
     */
    private $password;

    /**
     * @ORM\Column(type="boolean")
     * @var bool
     */
    private $esAdmin;

    /**
     * @ORM\Column(type="string",nullable=true)
     * @var String
     */
    private $image;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    private $money;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    private $reputation;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Replic", mappedBy="owner");
     * @var Replic[]
     */
    private $replics;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return String
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @param String $login
     * @return User
     */
    public function setLogin($login)
    {
        $this->login = $login;
        return $this;
    }

    /**
     * @return String
     */
    public function getNick()
    {
        return $this->nick;
    }

    /**
     * @param String $nick
     * @return User
     */
    public function setNick($nick)
    {
        $this->nick = $nick;
        return $this;
    }

    /**
     * @return String
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param String $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @return bool
     */
    public function isEsAdmin()
    {
        return $this->esAdmin;
    }

    /**
     * @param bool $esAdmin
     * @return User
     */
    public function setEsAdmin($esAdmin)
    {
        $this->esAdmin = $esAdmin;
        return $this;
    }

    /**
     * @return String
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param String $image
     * @return User
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return int
     */
    public function getMoney()
    {
        return $this->money;
    }

    /**
     * @param int $money
     * @return User
     */
    public function setMoney($money)
    {
        $this->money = $money;
        return $this;
    }

    /**
     * @return int
     */
    public function getReputation()
    {
        return $this->reputation;
    }

    /**
     * @param int $reputation
     * @return User
     */
    public function setReputation($reputation)
    {
        $this->reputation = $reputation;
        return $this;
    }

    /**
     * @return Replic[]
     */
    public function getReplics()
    {
        return $this->replics;
    }

    /**
     * @param Replic[] $replics
     * @return User
     */
    public function setReplics($replics)
    {
        $this->replics = $replics;
        return $this;
    }








    public function getRoles()
    {
        $roles = ['ROLE_PLAYER'];

        if ($this->isEsAdmin()){
            $roles[] = 'ROLE_ADMIN';
        }

        return $roles;
    }

    public function getSalt()
    {
       return null;
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function getUsername()
    {
        return $this->login;
    }

    public function __toString()
    {
        return $this->getNick();
    }


}