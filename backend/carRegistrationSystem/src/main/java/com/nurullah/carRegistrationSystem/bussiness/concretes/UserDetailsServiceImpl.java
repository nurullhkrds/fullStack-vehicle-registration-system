package com.nurullah.carRegistrationSystem.bussiness.concretes;

import com.nurullah.carRegistrationSystem.entities.User;
import com.nurullah.carRegistrationSystem.repository.UserRepository;
import com.nurullah.carRegistrationSystem.security.JwtUserDetails;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        return JwtUserDetails.create(user);
    }

    public UserDetails loadUserById(int id) {
        User user = userRepository.findById(id).get();
        return JwtUserDetails.create(user);
    }

}
